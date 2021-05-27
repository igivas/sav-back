import { injectable, inject } from 'tsyringe';
import { getConnection } from 'typeorm';
import { ICreateSituacaoVeiculo } from '../interfaces/core/ICoreSituacaoVeiculo';
import IKmsRepository from '../repositories/interfaces/IKmsRepository';
import IVeiculosRepository from '../repositories/interfaces/IVeiculosRepository';
import AppError from '../../../errors/AppError';
import SituacaoVeiculo from '../entities/SituacaoVeiculo';
import Veiculo from '../entities/Veiculo';
import Km from '../entities/Km';
import {
  IResponseSituacao,
  ISituacao,
} from '../interfaces/response/IResponseSituacao';
import ISituacoesRepository from '../repositories/interfaces/ISituacoesRepository';
import { IGetSituacoesVeiculo } from '../interfaces/request/IGetSituacoesVeiculo';
import IDataSituacaoRepository from '../repositories/interfaces/IDataSituacaoRepository';

@injectable()
class CoreSituacaoVeiculo {
  constructor(
    @inject('KmsRepository')
    private kmsRepository: IKmsRepository,

    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,

    @inject('SituacoesVeiculoRepository')
    private situacoesVeiculoRepository: ISituacoesRepository,

    @inject('DataSituacaoRepository')
    private DataSituacaoRepository: IDataSituacaoRepository,
  ) { }

  async create({
    idVeiculo,
    id_usuario,
    situacao,
  }: ICreateSituacaoVeiculo): Promise<object> {
    const id_veiculo = Number.parseInt(idVeiculo, 10);

    if (Number.isNaN(id_veiculo)) throw new AppError('Id do veiculo inválido');

    const veiculo = await this.veiculosRepository.findById(idVeiculo);

    if (!veiculo) throw new AppError('Veiculo não encontrado');

    if (situacao.id_situacao_tipo === veiculo.id_situacao_tipo)
      throw new AppError('Situacao de veiculo ja existente');

    const lastSituacao = await this.kmsRepository.findLastKmByIdVeiculo(
      id_veiculo,
    );
    const lastDataSituacao =
      await this.DataSituacaoRepository.findLastDataSituacaoByIdVeiculo(
        id_veiculo,
      );

    if (situacao.data_situacao < lastDataSituacao.data_situacao)
      if (situacao.km > lastSituacao.km_atual)
        throw new AppError(
          'Km de data passada não pode ser maior que o km atual',
        );

    if (lastSituacao.km_atual > situacao.km)
      throw new AppError('Km atual maior que o km inserido');

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    let newSituacao;
    try {
      const kmToInsert = queryRunner.manager.create(Km, {
        km_atual: situacao.km,
        id_veiculo,
        criado_por: id_usuario,
      });

      const datasituacaoToInsert = queryRunner.manager.create(SituacaoVeiculo, {
        data_situacao: situacao.data_situacao,
        id_veiculo,
        criado_por: id_usuario,
      });

      const createdKm = await queryRunner.manager.save(Km, kmToInsert);

      const createdDataSituacao = await queryRunner.manager.save(
        SituacaoVeiculo,
        datasituacaoToInsert,
      );

      const newSituacaoInsert = queryRunner.manager.create(SituacaoVeiculo, {
        ...situacao,
        criado_por: id_usuario,
        id_veiculo,
        id_km: createdKm.id_km,
        data_situacao: createdDataSituacao.data_situacao,
      });

      const veiculoMerged = queryRunner.manager.merge(Veiculo, veiculo, {
        id_situacao_tipo: situacao.id_situacao_tipo,
      });

      [newSituacao] = await Promise.all([
        queryRunner.manager.save(SituacaoVeiculo, newSituacaoInsert),
        queryRunner.manager.save(Veiculo, veiculoMerged),
      ]);

      newSituacao = {
        ...newSituacao,
        km: createdKm.km_atual,
        data_situacao: createdDataSituacao.data_situacao,
      };

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new AppError('Não pode criar situacao de veiculo');
    } finally {
      await queryRunner.release();
    }

    return newSituacao;
  }

  async list({
    id,
    page,
    perPage,
  }: IGetSituacoesVeiculo): Promise<IResponseSituacao> {
    try {
      let situacoesVeiculoResponse;

      const numberId = parseInt(id, 10);
      const pageNumber = parseInt(page, 10);
      const perPageNumber = parseInt(perPage, 10);

      const isPagedAndPerPage =
        Number.isNaN(pageNumber) && Number.isNaN(perPageNumber);
      const isNotPagedAndNotPerPage =
        !Number.isNaN(pageNumber) && !Number.isNaN(perPageNumber);

      if (
        (!isPagedAndPerPage && !isNotPagedAndNotPerPage) ||
        Number.isNaN(numberId)
      ) {
        throw new AppError('Parametros invalidos');
      }

      if (isNotPagedAndNotPerPage)
        situacoesVeiculoResponse =
          await this.situacoesVeiculoRepository.findByVeiculoId(numberId, 0, 0);
      else if (isPagedAndPerPage) {
        situacoesVeiculoResponse =
          await this.situacoesVeiculoRepository.findByVeiculoId(
            numberId,
            pageNumber,
            perPageNumber,
          );
      }

      if (!situacoesVeiculoResponse)
        throw new AppError('Nenhuma situacao dado o veiculo encontrada');

      const situacoesVeiculoNomes =
        situacoesVeiculoResponse.situacoes.map<ISituacao>(situacao => {
          return {
            id_situacao: situacao.id_situacao_veiculo,
            nome: situacao.situacaoTipo.nome,
            motivo: situacao.situacaoTipo.especificacao || undefined,
            observacao: situacao.observacao,
            criado_em: situacao.criado_em,
            data_situacao: situacao.data_situacao,
            km: situacao.kmSituacao?.km_atual || 0,
          };
        });
      return {
        total: perPageNumber,
        totalPage: pageNumber,
        situacoes: situacoesVeiculoNomes,
      };
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default CoreSituacaoVeiculo;
