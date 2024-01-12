import * as yup from 'yup';

export const contactSchema = yup.object().shape({
    fullname: yup.string().required("نام و نام خانوادگی الزامی می باشد"),
    photo: yup.string().url("ادرس معتبر نیست").required("ادرس تصویر الزامی می باشد"),
    mobile: yup.number().required("شماره موبایل الزامی می باشد"),
    email: yup.string().email("ادرس ایمیل معتبر نیست").required("ادرس ایمیل الزامی می باشد"),
    // job can be null
    job: yup.string().nullable(),
    group: yup.string().required("انتخاب گروه الزامی می باشد")
})