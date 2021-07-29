import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateHotSpotDTO } from '../dtos/inputs/create-hotspot.dto';
import { DeleteHotspotDTO } from '../dtos/inputs/delete-hotspot.dto';
import { UpdateHotspotDTO } from '../dtos/inputs/update-hotspot.dto';

@Injectable()
@EntityRepository(HotSpot)
export class HotSpotRepository extends Repository<HotSpot> {
  /* HotSpot archive repository */
  async archiveHotspot(archiveHotspotTypeDTO: DeleteHotspotDTO) {
    const { hotspot_id: type_id } = archiveHotspotTypeDTO;
    const type = await this.findHotspotById(type_id);
    type.hotspot_deleted = true;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while archiving the hotspot . Please try again later!`,
      );
    }
  }

  /* HotSpot restore repository */
  async restoreHotspot(restoreHotspoTypeDTO: DeleteHotspotDTO) {
    const { hotspot_id } = restoreHotspoTypeDTO;
    const type = await this.findHotspotById(hotspot_id);
    type.hotspot_deleted = false;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while restoring the hotspot type. Please try again later!`,
      );
    }
  }

  /* HotSpot delete repository */
  async deleteHotspot(deleteHotSpotTypeDTO: DeleteHotspotDTO) {
    const { hotspot_id } = deleteHotSpotTypeDTO;
    const type = await this.findHotspotById(hotspot_id);
    const result = await this.delete(type.id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    }
  }

  /* HotSpot by id */

  async findHotspotById(typeId: string): Promise<HotSpot> {
    const type = await this.findOne(typeId);

    if (!type)
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    return type;
  }
}
