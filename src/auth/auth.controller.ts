import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    


    @Post('/signup')
    signUp(@Body() authCredentialsdto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsdto);

    }
    @Post('/signin')
    signIn(@Body() authCredentialsdto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.singIn(authCredentialsdto);

}
}
     

