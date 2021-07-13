import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateHotpotTypeDTO } from '../dtos/inputs/create-hotspotType.dto';
import { DeleteHotspotTypeDTO } from '../dtos/inputs/delete-hotspotType.dto';
import { UpdateHotspotTypeDTO } from '../dtos/inputs/update-hotspotType.dto';

@Injectable()
@EntityRepository(HotspotType)
export class HotSpotTypeRepository extends Repository<HotspotType> {
  /* HotspotType creation repository */
  async createHotspotType(
    createHotspotTypeDTO: CreateHotpotTypeDTO,
  ): Promise<HotspotType> {
    const { type_name } = createHotspotTypeDTO;

    const type = this.create();
    type.type_name = type_name;

    try {
      await this.manager.save(type);
      return type;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `The hotspot type name already exist. Try again later.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Error while saving the data in database.`,
        );
      }
    }
  }

  /* HotspotType Update repository */
  async updateHotspotType(
    updateHotspotTypeDTO: UpdateHotspotTypeDTO,
  ): Promise<HotspotType> {
    const { type_name, type_id } = updateHotspotTypeDTO;
    const type = await this.findHotspotTypeById(type_id);
    type.type_name = type_name ? type_name : type.type_name;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while updating the hotspot type name!`,
      );
    }
  }

  /* HotspotType archive repository */
  async archiveHotspotType(archiveHotspotTypeDTO: DeleteHotspotTypeDTO) {
    const { type_id } = archiveHotspotTypeDTO;
    const type = await this.findHotspotTypeById(type_id);
    type.type_deleted = true;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while archiving the hotspot type. Please try again later!`,
      );
    }
  }

  /* HotspotType restore repository */
  async restoreHotspotType(restoreHotspoTypeDTO: DeleteHotspotTypeDTO) {
    const { type_id } = restoreHotspoTypeDTO;
    const type = await this.findHotspotTypeById(type_id);
    type.type_deleted = false;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while restoring the hotspot type. Please try again later!`,
      );
    }
  }

  /* HotspotType delete repository */
  async deleteHotspotType(deleteHotSpotTypeDTO: DeleteHotspotTypeDTO) {
    const { type_id } = deleteHotSpotTypeDTO;
    const type = await this.findHotspotTypeById(type_id);
    const result = await this.delete(type.id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    }
  }

  /* HotspotType by id */

  async findHotspotTypeById(typeId: string): Promise<HotspotType> {
    const type = await this.findOne(typeId);

    if (!type)
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    return type;
  }
}
