import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dtos/request/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { hash, compare } from "bcrypt";
import { ViewUserDTO } from './dtos/responses/view-user.dto';
import { UserBuilder } from './builder/user.build';
import { PayloadLoginDTO } from './dtos/request/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

    async register(userDTO: CreateUserDTO): Promise<ViewUserDTO> {
        await this.validateUniqueEmail(userDTO.email);
        await this.validatePasswordMatching(userDTO.password, userDTO.repeatPassword);

        const hashedPassword = await hash(userDTO.password, 10);
        const { email } = userDTO;

        const createdUser = await this.userRepository.create({
            email,
            password: hashedPassword
        });

        const viewCreatedUser: ViewUserDTO = UserBuilder.createViewUser(createdUser);
        return viewCreatedUser

    }

    async login({ email, password }: PayloadLoginDTO) {
        const user = await this.findByEmail(email);
        const passwordValid = await this.isValidPassword(password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException("Credentials Invalid");
        }

        const payload: ViewUserDTO = UserBuilder.createViewUser(user);
        const token = this.jwtService.sign(payload);

        return { payload, token };
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async findById(id: number) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }


    private async validateUniqueEmail(email: string) {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new NotFoundException('Email already exists');
        }
    }

    private async validatePasswordMatching(password: string, repeatPassword: string) {
        if (password !== repeatPassword) {
            throw new NotFoundException('Passwords do not match');
        }
    }

    async isValidPassword(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }


}
