import ChurchService from './ChurchService'

import {
  addChurchServiceHandler,
  deleteChurchServiceHandler,
  editChurchServiceHandler,
  getChurchServicesHandler,
  getSingleChurchServiceByIdHandler,
} from './churchService.controllers'

import IChurchService, { IBaseChurchService } from './churchService.interfaces'

import {
  addChurchService,
  deleteChurchService,
  editChurchService,
  getChurchServices,
  getSingleChurchServiceById,
} from './churchService.services'

import churchServiceRoutes from './churchService.routes'

export {
  // Model
  ChurchService,

  // interfaces
  IBaseChurchService,
  IChurchService,

  // services
  addChurchService,
  deleteChurchService,
  editChurchService,
  getChurchServices,
  getSingleChurchServiceById,

  // controllers
  addChurchServiceHandler,
  deleteChurchServiceHandler,
  editChurchServiceHandler,
  getChurchServicesHandler,
  getSingleChurchServiceByIdHandler,

  // Routes
  churchServiceRoutes,
}
