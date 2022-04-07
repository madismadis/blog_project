import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    ManyToOne,
    } from 'typeorm';
  import Post from './Post';


  @Entity()
  export default class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid', {nullable: true})
    parentId?: string;

    @Column('uuid', {nullable: true})
    postId?: string;

    @Column('varchar', { length: 75 })
    title!: string;

    @Column('text')
    content?: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column('boolean', { default: false })
    published!: boolean;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Post, post =>post.comments)
    post: Post[];
  }