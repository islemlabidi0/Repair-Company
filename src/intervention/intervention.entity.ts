import { User } from 'src/User/user.entity';
import { Device } from './../device/device.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { SparePart } from 'src/sparepart/sparepart.entity';


@Entity()
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column('text')
  description: string;

  // Relations
  @ManyToOne(() => Device, (device) => device.interventions, { nullable: false })
  device: Device;

  @ManyToOne(() => User, (user) => user.interventions, { nullable: false })
  technician: User;

  @ManyToMany(() => SparePart, (sparePart) => sparePart.interventions)
  @JoinTable() // This creates the join table automatically
  spareParts: SparePart[];
}
