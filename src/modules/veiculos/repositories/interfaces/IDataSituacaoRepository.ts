import SituacaoVeiculo from '@modules/veiculos/entities/SituacaoVeiculo';
import { IDefaultRepository } from './IDefaultRepository';

export default interface IDataSituacaoRepository
  extends IDefaultRepository<SituacaoVeiculo> {
  findLastDataSituacaoByIdVeiculo(id_veiculo: number): Promise<SituacaoVeiculo>;
  findDataSituacao(
    page?: number,
    perPage?: number,
  ): Promise<[SituacaoVeiculo[], number]>;
}
