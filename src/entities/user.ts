import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  getConnection,
  BaseEntity
} from 'typeorm';
// Dekoraator käsk, mis ütleb Typeormile, et tegemist on entity ehk
// andmebaasi objekti kirjeldusega
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { length: 150 })
  firstName: string;
  @Column('varchar', { length: 150, nullable: true })
  middleName?: string;
  @Column('varchar', { length: 150 })
  lastName: string;
  @Column('varchar')
  mobile: string;
  @Column('varchar', { length: 320, unique: true })
  email: string;
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;
  @Column('tinytext', { nullable: true })
  intro?: string;
  @Column('text', { nullable: true })
  profile?: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;