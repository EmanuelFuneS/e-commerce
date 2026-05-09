import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as pug from 'pug';

@Injectable()
export class MailService {
  private readonly SUBJECT_REGISTER = 'Welcome to ByteBazar';
  private readonly SUBJECT_RECOVERY = 'Recovery Password';
  private readonly SUBJECT_VERIFY = 'Verify Email';
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async recoveryPasswordEmail(params: {
    to: string;
    context: ISendMailOptions['context'];
  }) {
    const templatePath = join(
      process.cwd(),
      'src',
      'template',
      'recovery-password.pug',
    );
    const urlApp = this.config.get<string>('BASE_APP_URL');
    const html = pug.renderFile(templatePath, {
      ...params.context,
      recoveryUrl: `${urlApp}/reset-password`,
    });
    try {
      await this.mailerService.sendMail({
        to: params.to,
        from: '"ByteBazar" <support@bb.com>',
        subject: this.SUBJECT_RECOVERY,
        html: html,
      });
      this.logger.debug(`Email sent successfully`);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error sending email to ${params}`,
        error,
      );
    }
  }
  async verifyEmail(params: {
    to: string;
    context: ISendMailOptions['context'];
  }) {
    const urlApp = this.config.get<string>('BASE_APP_URL');
    const templatePath = join(
      process.cwd(),
      'src',
      'template',
      'validate-email.pug',
    );
    const html = pug.renderFile(templatePath, {
      ...params.context,
      verifyUrl: `${urlApp}/success-verification/${params.context.id}`,
    });
    try {
      const response = await this.mailerService.sendMail({
        to: params.to,
        from: '"ByteBazar" <support@bb.com>',
        subject: this.SUBJECT_VERIFY,
        html: html,
      });
      this.logger.debug(
        `Email sent successfully: ${response.message} ${response.accepted}`,
      );
    } catch (error) {
      this.logger.error(`Error sending email : ${(error as Error).message}`);
      throw new InternalServerErrorException(
        `Error sending email to ${params}`,
      );
    }
  }
  async RegisterEmail(params: {
    to: string;
    context: ISendMailOptions['context'];
  }) {
    const urlApp = this.config.get<string>('BASE_APP_URL');
    const templatePath = join(process.cwd(), 'src', 'template', 'register.pug');
    const html = pug.renderFile(templatePath, {
      ...params.context,
      loginUrl: `${urlApp}/login`,
    });
    try {
      const response = await this.mailerService.sendMail({
        to: params.to,
        from: '"ByteBazar" <support@bb.com>',
        subject: this.SUBJECT_REGISTER,
        html: html,
      });
      this.logger.debug(
        `Email sent successfully: ${response.message} ${response.accepted}`,
      );
    } catch (error) {
      this.logger.error(`Error sending email : ${(error as Error).message}`);
      throw new InternalServerErrorException(
        `Error sending email to ${params}`,
      );
    }
  }
}
