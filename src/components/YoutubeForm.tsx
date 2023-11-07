import { DevTool } from "@hookform/devtools"
import { useForm, useFieldArray } from "react-hook-form"

type FormValue = {
  username: string
  email: string
  channel: string
  social: {
    twitter: string
    facebook: string
  }, 
  phoneNumber: string[],
  phNumber: {
    number: string
  }[]
}

let renderCount = 0


const YoutubeForm = () => {

  const form = useForm<FormValue>({
    defaultValues: {

      username: "batman",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumber: ["", ""],
      phNumber: [{number: ""}],
    }
  })

  const {register, control, handleSubmit, formState} = form

  const {errors} = formState 


  const { fields, append, remove } = useFieldArray({
    name: 'phNumber',
    control
  })

  renderCount++

  const onSubmit = (data: FormValue) => {
    console.log("form submitted", data)
  }

  return (
    <div>
      <h1>Youtube Form ({renderCount/2})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className="form-control">

        
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              }
            })}
          />

          <p className="error">{errors.username?.message}</p>

        </div>
        
        <div className="form-control">


          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            },
            validate: {
              notAdmin: (fieldValue) => {
                return fieldValue !== "admin@example.com" || "enter a different email"
              },
              notBlank: (fieldValue) => {
                return !fieldValue.endsWith("@something.com") || "cannot end with @something.com"
              }
            }
          })} />

          <p className="error">{errors.email?.message}</p>


        </div>


        <div className="form-control">



          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel", {
            required: "Channel is required",
          })}/>

          <p className="error">{errors.channel?.message}</p>


        </div>


        <div className="form-control">

          <label htmlFor="twitter">twitter</label>
          <input type="text" id="twitter" {...register("social.twitter", {
            required: {
              value: true,
              message: "twitter is required", 
            }
          })}/>

          <p className="error">{errors.social?.twitter?.message}</p>

        </div>

        <div className="form-control">

          <label htmlFor="facebook">facebook</label>
          <input type="text" id="facebook" {...register("social.facebook", {
            required: {
              value: true,
              message: "facebook is required",
            }
          })}/>

          <p className="error">{errors.social?.facebook?.message}</p>

        </div>

        <div className="form-control">

          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input type="text" id="primary-phone" {...register("phoneNumber.0", {
            required: {
              value: true,
              message: "Primary phone number is required",
            }
          })}/>

          <p className="error">{errors.phoneNumber?.message}</p>

        </div>

        <div className="form-control">

          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input type="text" id="secondary-phone" {...register("phoneNumber.1", {
            required: {
              value: true,
              message: "Secondary phone number is required",
            }
          })}/>

          <p className="error">{errors.phoneNumber?.message}</p>

        </div>


        <div>
          <label htmlFor="">List of phone numbers</label>
          <div>
            {
              fields.map((field, index) => {
                return (
                  <div className="form-control" key={field.id}>
                    <input 
                      type="text" 
                      {...register(`phNumbers.${index}.number` as const)}
                    />

                    {
                      index > 0 && (
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                      )
                    }

                  </div>
                )
              })
            }
            <button type="button" onClick={() => append({number: ""})}>Add phone number</button>
          </div>
        </div>

        <button>Submit</button>
      </form>

      <DevTool control={control} />

    </div>
  )
}

export default YoutubeForm