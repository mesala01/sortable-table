import React from 'react';

const Modal = ({show}) =>{
    return(
            <div 
                className={`modal fade `} id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Summary</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <span>
                                <b>Mean:</b><p className="mean"></p>
                                </span>
                            </div>

                            <div>
                                <span>
                                <b>Max:</b><p className="max"></p>
                                </span>
                            </div>
                            
                            <div>
                                <span>
                                <b>Min:</b><p className="min"></p>
                                </span>
                            </div>
                            <div>
                                
                                <b>Run Time:</b><p><span className="runtime"></span>
                                <span> ms</span></p>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Modal;