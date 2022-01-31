import {
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity
} from 'typeorm';
import User from './User';

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column('varchar', { length: 75 })
  title: string;
  @Column()
  authorId!: string;
  @Column()
  parentId!: string;
  @Column('varchar', { length: 100 })
  metaTitle?: string;
  @Column('tinytext')
  summary: string;
  @Column('boolean', { default: false })
  published: boolean;
  @Column('text')
  content: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    createForeignKeyConstraints: true
  })
  author: Promise<User>;

  // Parent post
  @ManyToOne(() => Post, (post) => post.parentId, {
    createForeignKeyConstraints: true
  })
  parentPost: Promise<User>;
}