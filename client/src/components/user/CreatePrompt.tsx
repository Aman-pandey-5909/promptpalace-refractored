import React from 'react'

const CreatePrompt = ({rhfRegister, rhfHandleSubmit, errors}: any) => {
  return (
    <React.Fragment>
        <form action="" onSubmit={rhfHandleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input type="text" placeholder='Title...' id='title' className='border' {...rhfRegister('title', { required: true })} />
            </div>
            <div>
                <label htmlFor="prompt">Prompt: </label> 
                <textarea name="prompt" id="prompt" placeholder='Prompt...' className='border' {...rhfRegister('prompt', { required: true })}></textarea>
            </div>
            <div>
                <label htmlFor="description">Description: </label> 
                <textarea name="description" id="description" placeholder='Description...' className='border' {...rhfRegister('description', { required: true })}></textarea>
            </div>
            <div>
                <label htmlFor="tags">Tags: </label>
                <input type="text" placeholder='Tag1, Tag2' id='tags' className='border' {...rhfRegister('tags', { required: true })} />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
            {errors.title && <p>{errors.title.message}</p>}
            {errors.prompt && <p>{errors.prompt.message}</p>}
            {errors.description && <p>{errors.description.message}</p>}
            {errors.tags && <p>{errors.tags.message}</p>}
        </form>
    </React.Fragment>
  )
}

export default CreatePrompt