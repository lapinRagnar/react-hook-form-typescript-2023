import { DevTool } from "@hookform/devtools"
import { useForm } from "react-hook-form"

type FormValue = {
  username: string
  email: string
  channel: string
}

let renderCount = 0


const YoutubeForm = () => {

  const form = useForm<FormValue>()

  const {register, control, handleSubmit, formState} = form

  const {errors} = formState 

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

        <button>Submit</button>
      </form>

      <DevTool control={control} />

    </div>
  )
}

export default YoutubeForm