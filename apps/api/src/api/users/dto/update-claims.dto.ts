import { PartialType } from '@nestjs/swagger';
import { CreateClaimsDto } from './create-claims.dto';

export class UpdateClaimsDto extends PartialType(CreateClaimsDto) {}
