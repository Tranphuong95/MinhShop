import './comment.scss';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Button, Label} from 'reactstrap'

import {connect} from 'react-redux'
import {IRootState} from "app/shared/reducers";
import {hasAnyAuthority} from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";
export  const Comment=(props)=>{
  const [comment, setComment]:any=useState({
    comment:'',
    name:'',
    email:'',
    phoneNumber:'',
    children: []
  })
  const [dataComment, setDataComment]=useState([]);
  const [statusReply, setStatusReply]=useState(null);
  const [idReply, setIdReply]=useState(null);
  const {isAdmin}=props;

  const commentModal=document.getElementById('comment-modal')
  const onChangeComment=(event)=>{
    setComment({...comment, [event.target.name]: event.target.value})
  }
  useEffect(()=>{
    axios({
      method:'get',
      url:'http://localhost:4001/comments'
    })
      .then(res=>setDataComment(res.data))
  },[comment])

  const onOpenModalComment=()=>{
    window.console.log(comment)
    if(comment.comment.length>=3) return commentModal.style.display='block';
    else alert('Bạn phải nhập tối đa 3 ký tự')
  }
  const onCloseModalComment=()=>{
    commentModal.style.display='none'
  }
  const onReply=(id)=>{
    window.console.log(id)
    // setStatusReply(!statusReply?id:null)
    setStatusReply(statusReply===id?null:id)
    setIdReply(id);
  }

  const onSubComment=()=>{
    const realTime = new Date()
    axios({
      method:'post',
      url:'http://localhost:4001/comments',
      // data: {...comment, time: realTime, reply: idReply, name:isAdmin?"Quản trị viên": comment.name}
      data: {...comment, time: realTime, reply: idReply, admin: isAdmin}
    })
      .then(res=>{
        if(res.statusText==="Created"){
          onCloseModalComment();
          setComment({comment:'', name:'', email:'', phoneNumber:'', children:[]})
          setStatusReply(null)
          setIdReply(null)
        }
      })

  }

  const nestedComment=()=>{
    const commentMap={};
    dataComment.forEach(item=>commentMap[item.id]=item);
    dataComment.forEach(item=>{
      if(item.reply!==null){
        let alreadyReply=false;
        const parent =commentMap[item.reply];
        parent.children=parent.children||[]
        parent.children.map(x=>{
          if(x.id===item.id){
            alreadyReply=true;
          }
        })
        if(!alreadyReply){
          parent.children.push(item)
        }
      }
    })
    return dataComment.filter(item => {
      return item.reply === null;
    });
  }
  const showComment=( comments,parent)=>{
    window.console.log(parent?parent.children:[])
    window.console.log(comments)
    let items=null;
    items=comments.map(item=>{
      const times=new Date(item.time)
      const nameAvatar=item.name.split(' ').map(x=>x[0].toUpperCase())
      window.console.log(times)
      return(
        <div key={item.id}>
          <div className="area-comment">
            <div className="d-flex comment mt-3">
              <div className="avatar-commentber text-white"><strong>{nameAvatar}</strong></div>
              <div className="comment-content ml-2">
                <div className="d-flex">
                  <div className="mr-3"><strong>{item.name}</strong><strong className={item.admin?"avatar-admin bg-danger ml-1":"avatar-use"}>Quản trị viên</strong></div>
                  <div className="text-secondary">{`${times.toLocaleTimeString()} ${times.toLocaleDateString()}`}</div>
                </div>
                <div>
                  <span>{parent?`@${parent.name}: `:''}</span>
                  {item.comment}</div>
                <div className="reply text-primary"><span onClick={()=>onReply(item.id)}>Trả lời</span></div>
              </div>
            </div>
            <div className="mt-2" style={{paddingLeft: '82px'}}>{statusReply===item.id?formComment():null}</div>
          </div>
          <div className="area-reply ml-5">{showComment(item.children, item)}</div>
        </div>
      )
    })
    return items
  }
  useEffect(()=>{
    window.console.log(nestedComment())
  })

  window.console.log(isAdmin)
  const formComment=()=>{
    return(
      <AvForm onSubmit={onSubComment} autoComplete='off'>
        <AvGroup>
          <AvField type='textarea' name='comment' minLength={3} maxLength={200} value={comment.comment} onChange={onChangeComment}placeholder="Nhận xét không dài quá 200 ký tự"/>
        </AvGroup>
        <Button type="button" className="btn-danger text-white" onClick={onOpenModalComment}>Gửi nhận xét</Button>

        <div id="comment-modal" className="comment-modal-box">
          <div className="comment-modal-content d-flex justify-content-center">
            <div className=" modal-content col-6">
              <div className="d-flex justify-content-between">
                <span><h3>Hoàn thành gửi nhận xét</h3></span>
                <span className="close-modal d-flex justify-content-end" onClick={onCloseModalComment}><h3>&times;</h3></span>
              </div>
              <AvGroup>
                <Label>Tên<span>(bắt buộc)</span>:</Label>
                <AvInput type="text" name='name' value={comment.name} onChange={onChangeComment} required />
              </AvGroup>
              <span>Để nhận thông báo khi có trả lời. Hãy nhập email và số điện thoại (Không bắt buộc)</span>
              <AvGroup>
                <Label>
                  Email:
                </Label>
                <AvInput type="mail" name='email' value={comment.email} onChange={onChangeComment}/>
              </AvGroup>
              <AvGroup>
                <Label>
                  Số điện thoại:
                </Label>
                <AvInput type="text" name='phoneNumber' value={comment.phoneNumber} onChange={onChangeComment}/>
              </AvGroup>
              <Button type="submit" className="btn-danger text-white">Gửi nhận xét</Button>
            </div>
          </div>
        </div>
      </AvForm>
    )
  }
  window.console.log(nestedComment())
  return(
    <div className="d-flex justify-content-center mt-5">
      <div className="col-9">
        <h2 className="text-dark"><strong>Nhận xét ({dataComment?dataComment.length:0})</strong></h2>
        {formComment()}
        <div>
          {showComment(nestedComment(), false)}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({authentication, applicationProfile, locale}: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isOpenAPIEnabled: applicationProfile.isOpenAPIEnabled,
});
export default connect(mapStateToProps, null)(Comment)