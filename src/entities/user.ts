 import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  DeleteDateColumn
} from 'typeorm';
import Post from './Post';

type UserInfo ={
  id: string,
  firstName: string,
  middleName: string,
  lastName: string,
  mobile: string,
  email: string,
  intro: string,
  profile?: string,
  createdAt: Date,
  updatedAt: Date
}

// Dekoraator käsk, mis ütleb Typeormile, et tegemist on entity ehk
// andmebaasi objekti kirjeldusega
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 150 })
  firstName: string;

  @Column('varchar', { length: 150, nullable: true })
  middleName?: string;

  @Column('varchar', { length: 150 })
  lastName!: string;

  @Column('varchar')
  mobile!: string;

  @Column('varchar', { length: 320, unique: true })
  email!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column('tinytext', { nullable: true })
  intro?: string;
  
  @Column('text', { nullable: true })
  profile?: string;

  fullName: string;

  @DeleteDateColumn()
  deletedAt: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
  // Eager loading lisab teise tabelist andmed alati juurde iga päringuga
  // @OneToMany(() => Post, (post) => post.author, { eager: true })
  // posts: Post[];

  // Lazy loading lisab teise tabelist andmed kui seda on vaja
  // (nt. salvestamise User.post.save(post))
  // @OneToMany(() => Post, (post) => post.author)
  // posts: Promise<Post[]>;


  userInfo(){

    return {
      id: this.id,
      firstName: this.firstName,
      middleName: this.middleName ?? '',
      lastName: this.lastName,
      fullName: this.firstName + ' ' + this.lastName, 
      email: this.email,
      mobile: this.mobile,
      intro: this.intro ?? '',
      profile: this.profile ?? '',
      posts: this.posts,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}