import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    ManyToMany
  } from 'typeorm';
import Post from './Post';
  import User from './User';

  @Entity()
  export default class Category extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column('varchar', { length: 75 })
    title!: string;
    @Column('varchar', { length: 100 })
    metaTitle?: string;
    @Column('text')
    content?: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Post)
    posts: Post;
  }