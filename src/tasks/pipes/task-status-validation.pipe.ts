import { TaskStatus } from './../task.model';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  // metadata: ArgumentMetadata 其中还有这个参数 但是这边用不上
  readonly allowedStatues = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.allowedStatues.indexOf(status);
    return idx !== -1;
  }
}
