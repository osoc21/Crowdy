import { UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateHotSpotServiceDTO } from '../dtos/inputs/create-hotspotService.dto';
import { DeleteHotspotServiceDTO } from '../dtos/inputs/delete-hotspotService.dto';
import { HotspotServiceUpdateDTO } from '../dtos/inputs/update-hotspotService.dto';
import { DeleteHotspotServiceResponse } from '../dtos/responses/delete-hotspotService.response';
import { AllHotspotServiceQueryResponse } from '../dtos/responses/queries/allhotspotService.response';
import { CreateHospotServiceResponse } from '../dtos/responses/hotspotService-creation.response';
import { UpdateHotspotServiceResponse } from '../dtos/responses/hotspotService-update.response';
import { HotSpotService } from '../services/HotspotService.service';
import { HotspotService } from './../../../entities/hotspotService/hotspotService.entity';

@Resolver()
// @UseGuards(new GqlAuthGuardAdmin())
export class HotspotServiceResolver {
  constructor(private hotspotService: HotSpotService) {}

  /* Read all HotSpot Service*/
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => AllHotspotServiceQueryResponse)
  async AllHotspotServices(
    @Args('page', { type: () => Int }) page: number,
    @Args('perPage', { type: () => Int }) perPage: number,
    @Args('q', { type: () => String, nullable: true }) q?: string,
    @Args('deleted', { type: () => Boolean, nullable: true }) deleted?: boolean,
  ): Promise<AllHotspotServiceQueryResponse> {
    return await this.hotspotService.getAllHotspotServices(
      page,
      perPage,
      q,
      deleted,
    );
  }

  /* Read all HotSpot Service for selection*/
  @Query(() => [HotspotService])
  async AllActiveHotspotServices(): Promise<HotspotService[]> {
    return await this.hotspotService.AllActiveHotspotService();
  }

  // ** Get Selected Service HotSpot
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => HotspotService)
  async SelectedHotspotService(@Args('id', { type: () => String }) id: string) {
    return await this.hotspotService.getSelectedHotspotService(id);
  }

  /* Create HotSpot Service Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => CreateHospotServiceResponse)
  async HotspotCreationService(
    @Args('data') createHotspotServiceDTO: CreateHotSpotServiceDTO,
  ): Promise<CreateHospotServiceResponse> {
    const hotspotService = await this.hotspotService.createHotspotService(
      createHotspotServiceDTO,
    );
    return {
      hotspotService: hotspotService,
      message: 'The Hotspot Service has been saved!',
    };
  }

  /* Update HotSpot Service Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => UpdateHotspotServiceResponse)
  async HotspotServiceUpdate(
    @Args('data') updateHotSpotServiceDTO: HotspotServiceUpdateDTO,
  ): Promise<UpdateHotspotServiceResponse> {
    const service = await this.hotspotService.updateHotspotService(
      updateHotSpotServiceDTO,
    );
    return {
      hotspotService: service,
      message: 'The Hotspot Service has been updated!',
    };
  }

  /* Archive HotSpot Service Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotServiceResponse)
  async HotspotServiceArchive(
    @Args('data') archiveHotspotServiceDTO: DeleteHotspotServiceDTO,
  ): Promise<DeleteHotspotServiceResponse> {
    await this.hotspotService.archiveHotspotService(archiveHotspotServiceDTO);
    return {
      message: 'The Hotspot Service has been archived!',
    };
  }

  /* Restore HotSpot Service Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotServiceResponse)
  async HotSpotServiceRestore(
    @Args('data') restoreHotspotDTO: DeleteHotspotServiceDTO,
  ): Promise<DeleteHotspotServiceResponse> {
    await this.hotspotService.restoreHotspotService(restoreHotspotDTO);
    return {
      message: 'The Hotspot Service has been restored!',
    };
  }

  /* Delete HotSpot Service Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotServiceResponse)
  async HotspotServiceDelete(
    @Args('data') deleteHotspotServiceDTO: DeleteHotspotServiceDTO,
  ): Promise<DeleteHotspotServiceResponse> {
    await this.hotspotService.deleteHotspotService(deleteHotspotServiceDTO);
    return {
      message: 'The Hotspot Service has been deleted!',
    };
  }
}
