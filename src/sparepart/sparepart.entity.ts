import { Intervention } from 'src/intervention/intervention.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Intervention, (intervention) => intervention.spareParts)
  interventions: Intervention[];
}
