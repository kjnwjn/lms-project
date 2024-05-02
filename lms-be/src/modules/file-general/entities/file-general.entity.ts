import { GenericEntity } from 'src/common/base/entity/base.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file_general')
export class FileGeneral extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500, name: 'path' })
  path: string;

  @Column({ length: 255, name: 'type' })
  type: string;

  @Column({ type: 'bigint', name: 'size' })
  size: number;

  // @ManyToOne(() => Product, (product) => product.images, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  productId: number;

  @JoinColumn({ name: 'feedback_id', referencedColumnName: 'id' })
  feedbackId: number;
}
