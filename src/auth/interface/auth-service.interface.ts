import { AuthReqDto } from '../dto/auth-req.dto';
import { AuthResDto } from '../dto/auth-res.dto';

export interface AuthServiceInterface {
  register(authReqDto: AuthReqDto): Promise<AuthResDto>;
  login(authReqDto: AuthReqDto): Promise<AuthResDto>;
}
