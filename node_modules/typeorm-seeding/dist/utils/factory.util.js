"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameOfEntity = function (entity) {
    if (entity instanceof Function) {
        return entity.name;
    }
    else if (entity) {
        return new entity().constructor.name;
    }
    throw new Error('Enity is not defined');
};
exports.isPromiseLike = function (o) {
    return !!o && (typeof o === 'object' || typeof o === 'function') && typeof o.then === 'function' && !(o instanceof Date);
};
//# sourceMappingURL=factory.util.js.map