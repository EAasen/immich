import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsObject, IsString, Max, Min, ValidateNested } from 'class-validator';
import { ValidateBoolean } from 'src/validation';

export class TaskConfig {
  @ValidateBoolean()
  enabled!: boolean;
}

export class ModelConfig extends TaskConfig {
  @IsString()
  @IsNotEmpty()
  modelName!: string;
}

export class LoadTextualModelOnConnection extends TaskConfig {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @ApiProperty({ type: 'number', format: 'int64' })
  ttl!: number;
}

export class CLIPConfig extends ModelConfig {
  @Type(() => LoadTextualModelOnConnection)
  @ValidateNested()
  @IsObject()
  loadTextualModelOnConnection!: LoadTextualModelOnConnection;
}

export class DuplicateDetectionConfig extends TaskConfig {
  @IsNumber()
  @Min(0.001)
  @Max(0.1)
  @Type(() => Number)
  @ApiProperty({ type: 'number', format: 'double' })
  maxDistance!: number;
}

export class FacialRecognitionConfig extends ModelConfig {
  @IsNumber()
  @Min(0.1)
  @Max(1)
  @Type(() => Number)
  @ApiProperty({ type: 'number', format: 'double' })
  minScore!: number;

  @IsNumber()
  @Min(0.1)
  @Max(2)
  @Type(() => Number)
  @ApiProperty({ type: 'number', format: 'double' })
  maxDistance!: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ type: 'integer' })
  minFaces!: number;
}
