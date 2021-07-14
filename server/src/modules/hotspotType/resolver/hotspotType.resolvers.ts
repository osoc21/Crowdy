import { UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuardAdmin } from 'src/modules/admin-auth/auth-strategy/guards/auth-gql.guard';
import { CreateHotspotTypeDTO } from '../dtos/inputs/create-hotspotType.dto';
import { DeleteHotspotTypeDTO } from '../dtos/inputs/delete-hotspotType.dto';
import { UpdateHotspotTypeDTO } from '../dtos/inputs/update-hotspotType.dto';
import { DeleteHotspotTypeResponse } from '../dtos/responses/delete-hotspotType.response';
import { AllHotspotTypeQueryResponse } from '../dtos/responses/queries/allhotspotType.response';
import { CreateHospotTypeResponse } from '../dtos/responses/hotspotType-creation.response';
import { UpdateHotspoTypeResponse } from '../dtos/responses/hotspotType-update.response';
import { HotSpotTypeService } from '../services/HotspotType.service';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';

@Resolver()
// @UseGuards(new GqlAuthGuardAdmin())
export class HotspotTypeResolver {
  constructor(private hotspotTypeService: HotSpotTypeService) {}

  /* Read all HotspotType */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => AllHotspotTypeQueryResponse)
  async AllHotspotType(
    @Args('page', { type: () => Int }) page: number,
    @Args('perPage', { type: () => Int }) perPage: number,
    @Args('q', { type: () => String, nullable: true }) q?: string,
    @Args('deleted', { type: () => Boolean, nullable: true }) deleted?: boolean,
  ): Promise<AllHotspotTypeQueryResponse> {
    return await this.hotspotTypeService.getAllHotspotType(
      page,
      perPage,
      q,
      deleted,
    );
  }

  /* Read all HotspotType for selection*/
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => [HotspotType])
  async AllActiveHotspotType(): Promise<HotspotType[]> {
    return await this.hotspotTypeService.AllActiveHotspotType();
  }

  // ** Get Selected HotspotType
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => HotspotType)
  async SelectedHotspotType(@Args('id', { type: () => String }) id: string) {
    return await this.hotspotTypeService.getSelectedHotspotType(id);
  }

  /* Create HotspotType Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => CreateHospotTypeResponse)
  async HotspotTypeCreation(
    @Args('data') createTypeDTO: CreateHotspotTypeDTO,
  ): Promise<CreateHospotTypeResponse> {
    const type = await this.hotspotTypeService.createHotspotType(createTypeDTO);
    return {
      type: type,
      message: 'The Hotspot type has been saved!',
    };
  }

  /* Update HotspotType Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => UpdateHotspoTypeResponse)
  async HotspotTypeUpdate(
    @Args('data') updateTypeDTO: UpdateHotspotTypeDTO,
  ): Promise<UpdateHotspoTypeResponse> {
    const type = await this.hotspotTypeService.updateHotspotType(updateTypeDTO);
    return {
      type: type,
      message: 'The Hotspot type has been updated!',
    };
  }

  /* Archive HotspotType Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotTypeResponse)
  async HotspotTypeArchive(
    @Args('data') deleteTypeDTO: DeleteHotspotTypeDTO,
  ): Promise<DeleteHotspotTypeResponse> {
    await this.hotspotTypeService.archiveHotspotType(deleteTypeDTO);
    return {
      message: 'The Hotspot type has been archived!',
    };
  }

  /* Restore HotspotType Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotTypeResponse)
  async HotspotTypeRestore(
    @Args('data') deleteTypeDTO: DeleteHotspotTypeDTO,
  ): Promise<DeleteHotspotTypeResponse> {
    await this.hotspotTypeService.restoreHotspotType(deleteTypeDTO);
    return {
      message: 'The Hotspot type has been restored!',
    };
  }

  /* Delete HotspotType Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteHotspotTypeResponse)
  async HotspotTypeDelete(
    @Args('data') deleteTypeDTO: DeleteHotspotTypeDTO,
  ): Promise<DeleteHotspotTypeResponse> {
    await this.hotspotTypeService.deleteHotspotType(deleteTypeDTO);
    return {
      message: 'The Hotspot type has been deleted!',
    };
  }
}
