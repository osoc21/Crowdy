import { UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuardAdmin } from 'src/modules/admin-auth/auth-strategy/guards/auth-gql.guard';
import { CreateHotSpotDTO } from '../dtos/inputs/create-hotspot.dto';
import { DeleteHotspotDTO } from '../dtos/inputs/delete-hotspot.dto';
import { UpdateHotspotDTO } from '../dtos/inputs/update-hotspot.dto';
import { DeleteHotspotResponse } from '../dtos/responses/delete-hotspot.response';
import { AllHotspotQueryResponse } from '../dtos/responses/queries/allhotspot.response';
import { CreateHospotResponse } from '../dtos/responses/hotspot-creation.response';
import { UpdateHotspoResponse } from '../dtos/responses/hotspot-update.response';
import { HotSpotService } from '../services/Hotspot.service';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';

@Resolver()
// @UseGuards(new GqlAuthGuardAdmin())
export class HotspotTypeResolver {
  constructor(private hotspotTypeService: HotSpotService) {}

  /* Read all HotSpot */
  @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => AllHotspotQueryResponse)
  async AllHotspot(
    @Args('page', { type: () => Int }) page: number,
    @Args('perPage', { type: () => Int }) perPage: number,
    @Args('q', { type: () => String, nullable: true }) q?: string,
    @Args('deleted', { type: () => Boolean, nullable: true }) deleted?: boolean,
  ): Promise<AllHotspotQueryResponse> {
    return await this.hotspotTypeService.getAllHotspot(
      page,
      perPage,
      q,
      deleted,
    );
  }

  /* Read all HotSpot for selection*/
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => [HotSpot])
  async AllActiveHotspot(): Promise<HotSpot[]> {
    return await this.hotspotTypeService.AllActiveHotspot();
  }

  // ** Get Selected HotSpot
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => HotSpot)
  async SelectedHotspot(@Args('id', { type: () => String }) id: string) {
    return await this.hotspotTypeService.getSelectedHotspot(id);
  }

  /* Create HotSpot Mutation */
  @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => CreateHospotResponse)
  async HotspotCreation(
    @Args('data') createHotspotDTO: CreateHotSpotDTO,
  ): Promise<CreateHospotResponse> {
    const hotspot = await this.hotspotTypeService.createHotspot(
      createHotspotDTO,
    );
    return {
      hotspot: hotspot,
      message: 'The Hotspot has been saved!',
    };
  }

  /* Update HotSpot Mutation */
  @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => UpdateHotspoResponse)
  async HotspotUpdate(
    @Args('data') updateHotSpotDTO: UpdateHotspotDTO,
  ): Promise<UpdateHotspoResponse> {
    const type = await this.hotspotTypeService.updateHotspot(updateHotSpotDTO);
    return {
      hotspot: type,
      message: 'The Hotspot has been updated!',
    };
  }

  /* Archive HotSpot Mutation */
  @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotResponse)
  async HotspotArchive(
    @Args('data') deleteHotspotDTO: DeleteHotspotDTO,
  ): Promise<DeleteHotspotResponse> {
    await this.hotspotTypeService.archiveHotspot(deleteHotspotDTO);
    return {
      message: 'The Hotspot has been archived!',
    };
  }

  /* Restore HotSpot Mutation */
  @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotResponse)
  async HotSpotRestore(
    @Args('data') deleteHotspotDTO: DeleteHotspotDTO,
  ): Promise<DeleteHotspotResponse> {
    await this.hotspotTypeService.restoreHotspot(deleteHotspotDTO);
    return {
      message: 'The Hotspot has been restored!',
    };
  }

  /* Delete HotSpot Mutation */
  @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotResponse)
  async HotspotDelete(
    @Args('data') deleteHotspotDTO: DeleteHotspotDTO,
  ): Promise<DeleteHotspotResponse> {
    await this.hotspotTypeService.deleteHotspot(deleteHotspotDTO);
    return {
      message: 'The Hotspot has been deleted!',
    };
  }
}
