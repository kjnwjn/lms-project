import { PartialType } from '@nestjs/swagger';
import { CreateQuizChoiceDto } from './create-quiz-choice.dto';

export class UpdateQuizChoiceDto extends PartialType(CreateQuizChoiceDto) {
  /**Empty */
}
