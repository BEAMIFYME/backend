import { PartialType } from '@nestjs/swagger';
import { CreateTwitchDto } from './create-twitch.dto';

export class UpdateTwitchDto extends PartialType(CreateTwitchDto) {}
