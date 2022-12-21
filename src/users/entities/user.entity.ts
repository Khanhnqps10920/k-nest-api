import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role: UserRole;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('text', {
    default: UserRole.CUSTOMER,
  })
  role: UserRole;
}
