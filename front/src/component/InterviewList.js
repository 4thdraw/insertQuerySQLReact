import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import axios from 'axios';

class Classcomponent extends Component {
    constructor(props){
        super(props)
        this.state ={
            message : '서비스요청을 기다리는 중...',
            interviewData : [],
            
        }
    }
    componentDidMount = async () => {
        try{
       
        axios.post('/api?type='+this.props.dbinfo.botable, {
            headers :{ 'Content-Type' : 'application/json' },
            body : { ...this.props.dbinfo }

        }).then( res => { 
            
            console.log(res.data) //데이터 콘솔에서 확인
        
            try{
                this.setState({ interviewData : [...res.data] }) 
                // array는 대체되는 정보로 쓸수없기때문에 대입식불가
                // 기존의 [] 빈정렬과 res.data을 합하는 식임
                console.log(this.state.interviewData) //리액트 변수에 데이터옮겨짐 데이터타입이 정렬이므로 map으로 풀어버림
            }
            catch(err){
                this.setState({ message : 'DB데이터타입검수바람 ' +  err});
            }

        }).catch( err => {
            this.setState({ message : '접속하였으나 처리하지 못함 ' +  err});
        })
       }
       catch(err){
           this.setState({ message : '서버접속불가 ' +  err});
       }  
        
    }
    render() {
        return (
            <div className={ ' container text-center py-5'}>
                 <h2>{ this.state.interviewData.length > 0 ? this.props.dbinfo.titlenm : this.state.message }</h2>                 
                 {
                     this.state.interviewData.map(
                         (content) =>
                         {
                             return (
                                 <dl className='row' key={ content.no }>
                                     <dt className='border-top border-bottom'>
                                        <div className='row justify-content-between align-items-center'>
                                            <p className='col-sm-9 mb-0'>{ content.subject }</p>
                                            <p className='btn interviewBtn col-sm-3  mb-0'>
                                                <Link to={'/interviewModify/'+ content.no } className='modify btn btn-primary mx-1 '>M</Link> 
                                                <a href="#" className='delete btn btn-primary mx-1'>D</a>
                                            </p>                                            
                                     </div>
                                    </dt>
                                    <dd className='p-5'>
                                     { content.content }
                                    </dd>
                                    
                                    
                                 </dl>
                             )
                         }
                     )
                 }
            </div>
        );
    }
}

export default Classcomponent;