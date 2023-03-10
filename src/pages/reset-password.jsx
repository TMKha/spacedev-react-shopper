import { useAuth } from "@/components/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAsync } from "@/hooks/useAsync";
import { useForm } from "@/hooks/useForm";
import { userService } from "@/services/user";
import { handleError } from "@/utils/handleError";
import { setToken } from "@/utils/token";
import { confirmPassword, regexp, required } from "@/utils/validate";
import { message } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const {getProfile} = useAuth()
  const [search] = useSearchParams();
  const [isSuccess,setIsSuccess] = useState(false)

  const {
    execute: sendEmailResetPasswordService,
    loading: sendEmailResetPasswordLoading,
  } = useAsync(userService.sendEmailResetPassword);
  const {
    execute: changePasswordByCodeService,
    loading: changePasswordByCodeLoading,
  } = useAsync(userService.changePasswordByCode);
  const code = search.get("code");
  console.log(code);

  const resetPasswordForm = useForm({
    password: [required()],
    confirmPassword: [required(), confirmPassword("password")],
  });
  const sendEmailForm = useForm({
    username: [required(), regexp("email")],
  });

  const onSendEmail = async() => {
    try {
      if (sendEmailForm.validate()) {
        const res =  await sendEmailResetPasswordService(sendEmailForm.values)
        message.success(res.message)
        setIsSuccess(true)
      }
    } catch (error) {
      handleError(error);
    }
  };
  const onResetPassword = async() => {
    try {
      if (resetPasswordForm.validate()) {
          const res  = await changePasswordByCodeService(
          {
            password:resetPasswordForm.values.password,
            code
          })
          setToken(res.data)
          getProfile()
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <main className="auth" id="main">
      {!code ?
       (
        isSuccess ?(
          <div className="flex flex-col gap-10 text-center max-w-2xl m-auto pb-10 pt-10">
            <h1 className="text-2xl font-bold">G???i email l???y l???i m???t kh???u th??nh c??ng</h1>
            <p>Ch??ng t??i ???? g???i cho b???n email l???y l???i m???t kh???u, vui l??ng ki???m tra email</p>
          </div>
        ): (

          <div className="wrap">
          <h2 className="title">?????t l???i m???t kh???u</h2>
          <Input
            className="mb-5"
            placeholder="Email"
            {...sendEmailForm.register("username")}
          />
          <Button onClick={onSendEmail} loading={sendEmailResetPasswordLoading}>
            Ti???p theo
          </Button>
        </div>
        )

      ) : (
        <div className="wrap">
          <h2 className="title">X??c nh???n m???t kh???u</h2>

          <Input
            className="mb-5"
            type="password"
            placeholder="M???t kh???u"
            {...resetPasswordForm.register("password")}
          />
          <Input
            className="mb-5"
            type="password"
            placeholder="Nh???p l???i m???t kh???u"
            {...resetPasswordForm.register("confirmPassword")}
          />

          <p style={{ marginBottom: "15px" }}>
            N???u ch??a nh???n ???????c email n??o, vui l??ng b???m n??t{" "}
            <a className="link" href="#">
              G???i l???i
            </a>{" "}
            trong 20 gi??y
          </p>
          <Button
            onClick={onResetPassword}
            loading={changePasswordByCodeLoading}
          >
            X??c nh???n
          </Button>
        </div>
      )}
    </main>
  );
};
