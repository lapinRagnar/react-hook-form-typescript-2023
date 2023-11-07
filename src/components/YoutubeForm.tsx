import {useEffect} from 'react'
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
  }[],
  age: number,
  dob: Date
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
      age: 0,
      dob: new Date()
    }
  })

  const {register, control, handleSubmit, formState, watch} = form

  const {errors} = formState 


  const { fields, append, remove } = useFieldArray({
    name: 'phNumber',
    control
  })

  // const watchUsername = watch("username") // ou un array la dessous, si on ne met pas d'argument il va regarder tout le champ du formulaire
  // const watchUsername = watch(["username", "email"])

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value)
    })
  
    return () => subscription.unsubscribe()

  }, [watch])


  renderCount++

  const onSubmit = (data: FormValue) => {
    console.log("form submitted", data)
  }

  return (
    <div>
      <h1>Youtube Form ({renderCount/2})</h1>
      <h2>Watched value : </h2>
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
                      {...register(`phNumber.${index}.number` as const)}
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


        
        <div className="form-control">



          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Age is required",
            },
          })}/>

          <p className="error">{errors.age?.message}</p>


        </div>


        <div className="form-control">



          <label htmlFor="dob">Date of birth</label>
          <input type="date" id="dob" {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "Date of birth is required",
            },
          })}/>

          <p className="error">{errors.dob?.message}</p>


        </div>



        <button>Submit</button>
      </form>

      <DevTool control={control} />

    </div>
  )
}

export default YoutubeForm