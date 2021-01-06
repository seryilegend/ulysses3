import { AuthReqDto } from '../dto/auth-req.dto';
import { AuthResDto } from '../dto/auth-res.dto';

export interface AuthControllerInterface {
  register(authReqDto: AuthReqDto): Promise<AuthResDto>;
  login(authReqDto: AuthReqDto): Promise<AuthResDto>;
}
