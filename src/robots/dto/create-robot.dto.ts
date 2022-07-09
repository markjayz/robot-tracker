import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateRobotDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    purpose: string;

    is_active:boolean

    @IsNotEmpty()
    created_at: Date;

    updated_at: Date;
}
