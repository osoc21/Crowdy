import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';
import { HotspotServiceRepository } from 'src/modules/hotspotService/repository/hotspotService.repository';
import { HotSpotTypeRepository } from 'src/modules/hotspotType/repository/hotspotType.repository';
import { VoteRepository } from 'src/modules/vote/repository/vote.repository';
import { CreateHotSpotDTO } from '../dtos/inputs/create-hotspot.dto';
import { DeleteHotspotDTO } from '../dtos/inputs/delete-hotspot.dto';
import { UpdateHotspotDTO } from '../dtos/inputs/update-hotspot.dto';
import { allActiveHotspotResponse } from '../dtos/responses/queries/allActiveHotspot.response';
import { AllHotspotQueryResponse } from '../dtos/responses/queries/allhotspot.response';
import { HotSpotRepository } from '../repository/hotspot.repository';

@Injectable()
export class HotSpotService {
  constructor(
    @InjectRepository(HotSpotRepository)
    private readonly hotspotRepository: HotSpotRepository,
    private readonly hotspotTypeRepository: HotSpotTypeRepository,
    private readonly hotspotServiceRepository: HotspotServiceRepository,
    private readonly voteRepository: VoteRepository,
  ) {}

  /* Get all Hotspot */
  async getAllHotspot(
    page?: number,
    perPage?: number,
    q?: string,
    deleted?: boolean,
  ): Promise<AllHotspotQueryResponse> {
    let HotspotTypeQB = await this.hotspotRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.hotspots', 'hotspot');
    let countResults = await HotspotTypeQB.getCount();

    if (deleted == true) {
      HotspotTypeQB = HotspotTypeQB.andWhere('e.type_deleted = true', {
        deleted,
      });
      countResults = await HotspotTypeQB.getCount();
    } else if (deleted == false) {
      HotspotTypeQB = HotspotTypeQB.andWhere('e.service_deleted = false', {
        deleted,
      });
      countResults = await HotspotTypeQB.getCount();
    }

    if (q) {
      HotspotTypeQB = HotspotTypeQB.andWhere(
        'e.service_name ilike :service_name',
        {
          service_name: `%${q}%`,
        },
      );
      countResults = await HotspotTypeQB.getCount();
    }
    const skipValue: number = perPage * (page - 1);
    const services = await HotspotTypeQB.take(perPage)
      .skip(skipValue)
      .getMany();
    return {
      hotspots: services,
      totalCount: countResults,
    };
  }

  // ** Get all active Hotspot
  async AllActiveHotspot(): Promise<allActiveHotspotResponse> {
    // ** Getting the hotspot
    let hotspots = await this.hotspotRepository.find({
      where: {
        hotspot_deleted: 'false',
      },
      relations: ['types', 'services', 'votes'],
    });

    let voteInfo = { votesCount: '6', crowdLevel: '2.5' };

    // const hotspotslength = hotspots.map(e => console.log(e.votes.length));
    for (let i = 0; i < hotspots.length; i++) {
      const element = ((hotspots[i] as unknown) + '' + voteInfo) as unknown;
      // console.log(element);
    }

    // console.log(hotspotslength);
    return {
      hotspots: hotspots,
      totalVoteCount: 3,
      crowdLevel: 5,
    };
  }

  // ** Get Selected Hotspot
  async getSelectedHotspot(id: string) {
    return await this.hotspotRepository.findOne(id, {
      relations: ['types', 'services', 'votes'],
    });
  }

  /* Hotspot creation service */
  async createHotspot(createHotspotDTO: CreateHotSpotDTO): Promise<HotSpot> {
    const {
      hotspot_name,
      city,
      district,
      coordinates,
      street,
      number,
      types,
      services,
    } = createHotspotDTO;

    // Getting the types from inputed array of types ids
    try {
      var typesArray = await this.hotspotTypeRepository.findByIds(types);
    } catch {
      throw new InternalServerErrorException(
        `One of selected types is invalid.`,
      );
    }

    // Getting the services from inputed array of services ids
    try {
      var servicesArray = await this.hotspotServiceRepository.findByIds(
        services,
      );
    } catch {
      throw new InternalServerErrorException(
        `One of selected services is invalid.`,
      );
    }

    const hotspot = this.hotspotRepository.create();
    hotspot.hotspot_name = hotspot_name;
    hotspot.coordinates = coordinates;
    hotspot.city = city;
    hotspot.district = district;
    hotspot.street = street;
    hotspot.number = number;
    hotspot.types = typesArray;
    hotspot.services = servicesArray;

    try {
      await this.hotspotRepository.save(hotspot);
      return hotspot;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `The hotspot already exists. Please try again later.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Error while saving data int database!`,
        );
      }
    }
  }

  /* Hotspot Update service */
  async updateHotspot(updateHotspotDTO: UpdateHotspotDTO) {
    const {
      hotspot_name,
      city,
      district,
      coordinates,
      street,
      number,
      types,
      services,
    } = updateHotspotDTO;

    // Getting the types from inputed array of types ids
    try {
      var typesArray = await this.hotspotTypeRepository.findByIds(types);
    } catch {
      throw new InternalServerErrorException(
        `One of selected types is invalid.`,
      );
    }

    // Getting the services from inputed array of services ids
    try {
      var servicesArray = await this.hotspotServiceRepository.findByIds(
        services,
      );
    } catch {
      throw new InternalServerErrorException(
        `One of selected services is invalid.`,
      );
    }

    const hotspot = this.hotspotRepository.create();
    hotspot.hotspot_name = hotspot_name ? hotspot_name : hotspot.hotspot_name;
    hotspot.coordinates = coordinates ? coordinates : hotspot.coordinates;
    hotspot.city = city ? city : hotspot.city;
    hotspot.district = district ? district : hotspot.district;
    hotspot.street = street ? street : hotspot.street;
    hotspot.number = number ? number : hotspot.number;
    hotspot.types = typesArray ? typesArray : hotspot.types;
    hotspot.services = servicesArray ? servicesArray : hotspot.services;

    try {
      await this.hotspotRepository.save(hotspot);
      return hotspot;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while saving data int database!`,
      );
    }
  }

  /* Hotspot Archive service */
  async archiveHotspot(archiveHotspotDTO: DeleteHotspotDTO) {
    return await this.hotspotRepository.archiveHotspot(archiveHotspotDTO);
  }

  /* Hotspot Restore service */
  async restoreHotspot(restoreHotspotDTO: DeleteHotspotDTO) {
    return await this.hotspotRepository.restoreHotspot(restoreHotspotDTO);
  }

  /* Hotspot delete service */
  async deleteHotspot(deleteHotspotDTO: DeleteHotspotDTO) {
    return await this.hotspotRepository.deleteHotspot(deleteHotspotDTO);
  }
}
