import React, { useState, useEffect } from 'react';
import Nav from '../../common/Nav/Nav';
import Title from './Title';
import styled from '@emotion/styled';
import { getGugunList } from '../../../apis/guguns';
import CourseList from './CourseList';
import { AiOutlineSearch } from 'react-icons/ai';
import CommunityCategory from '../CommunityCategory';
import Footer from '../../common/Footer/Footer';
import UploadImg from './UploadImg';
import { atom, useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { RecruitAtom, RecruitInfo } from '../../../states/RecruitAtom';
import { uploadImage } from '../../../apis/uploadImg';
import { userAtom } from '../../../states/UserAtom';
import axios from 'axios';
import { postRecruit } from '../../../apis/recruit';

const Recruit = () => {

    const user = useRecoilValue(userAtom);
    // console.log(user);
    const [selectedFile, setSelectedFile] = useState(null);
    const setRecruitImg = useSetRecoilState(RecruitAtom);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files[0]);
    };
    
    const HandlerRecruit = () => {
        postRecruit(recruit, user.accessToken) ;
      };

    const handleUpload = async () => {
        const requestData = {
            file: selectedFile
          };
        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.accessToken}`,
            },
          };
        
          try {
            const res = await axios.post(
              'https://ode-seoul.fly.dev/images',
              requestData,
              config
            );
      
            if (res.data.code === 200) {
                
              console.log('업로드 성공', res.data.result.url);
      
              setRecruitImg((prevRecruit) => ({
                ...prevRecruit,
                image: res.data.result.url,
              }));
            } else {
              // TODO: 실패 처리
            }
          } catch (error) {
            console.error(error);
          }

            

    };

    const Noti = 
        "자유게시판에서는 주제와 무관히 자유롭게 이야기를 나눌 수 있습니다. \n 자유게시판의 게시글 및 댓글은 로그인을 해야만 작성 수 있습니다.\n 아직 가입하지 않으셨나요? 지금 바로 회원가입하세요!(우상단 버튼)\n자유게시판에서 모든 게시물 및 댓글의 작성자는 작성자의 닉네임으로 표시됩니다.\n 작성자를 익명으로 하고 싶다면 ‘익명게시판’을 이용해 보세요!\n 홍보성 게시글이나 제제가 필요한 게시물 및 댓글은 관리자에 의해 삭제될 수 있습니다.\n 홍보성 게시글은 ‘정보게시판’을 이용 바랍니다. "
      
  //구군 get 요청
  const [names, setNames] = useState([]);
  useEffect(() => {
    getGugunList()
      .then((response) => {
        const result = response.result;
        const names = result.map((item) => item.name);
        setNames(names);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [location, setLocation] = useState('');
  const handleLocationSelect = (name: string) => {
    setLocation(name);
  };

  //상태
  const [state, setState] = useState<RecruitInfo>({
    courseId: 0,
    category: 'COM_ANIMAL',
    title: '',
    content: '',
    image: 'https://ik.imagekit.io/njw1204/tr:w-720,h-720,c-at_max/ode-seoul/20230524012509_BTlTBranq',
    maxPeople: 0,
    scheduledAt: '',
  });

  const [recruit, setRecruit] = useRecoilState(RecruitAtom);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleScheduledAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prevState) => ({
      ...prevState,
      scheduledAt: value,
    }));
  };

  const handleMaxPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prevState) => ({
      ...prevState,
      maxPeople: parseInt(value),
    }));
  };



  const ShowRecoil = () => {
    console.log(recruit);
  }
  useEffect(() => {
    setRecruit(state); // Recoil 상태 업데이트
  }, [state, setRecruit]);

  return (
    <>
      <Nav />
        <Wrapper >
            {/*  */}
            <Title text='제목을 입력해주세요' /> 
            <StyledInput
            type='text'
            value={state.title}
            onChange={handleTitleChange}
            placeholder='같이 출사하러 가요!'
            />
            <Title text='내용을 입력해주세요' /> 
            <StyledInput
            type='text'
            value={state.content}
            onChange={handleContentChange}
            placeholder='서로의 모델과 작가가 되어줄 사람 구합니다!'
            />
            <Title text='생태 문화길을 선택해주세요' />
            <Container className='row' >
                <div className='col-lg-4 col-sm-12'>
                    < ListContainer  >
                        <Ul>
                            {names.map((name, index) => (
                            <Li key={index} onClick={() => handleLocationSelect(name)}>
                                {name}
                            </Li>
                            ))}
                        </Ul>
                    </ListContainer >
                </div>
                <div className='col-lg-8 col-sm-12'>
                    <CourseList location={location} />
                </div>
            </Container>
            <Title text='약속 정보를 입력해주세요' />
                <SearchInput>
                    <Input
                        type="text"
                        value={state.scheduledAt}
                        onChange={handleScheduledAtChange}
                        placeholder="약속 날짜와 시간을 정해주세요"
                    />
                    <SearchIcon />
                </SearchInput>
                <SearchInput>
                    <Input
                        type="number"
                        value={state.maxPeople}
                        onChange={handleMaxPeopleChange}
                        placeholder="최대 인원을 정해주세요"
                    />
                    <SearchIcon />
                </SearchInput>

            <Title text='카테고리를 선택해주세요' />
                <CommunityCategory />
            <Title text='배경 사진을 선택해주세요' />
                <UploadImg text='img' />
                <Container2>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Upload</button>
                </Container2>

            <Title text='주의사항을 확인해주세요' />
                <SmallText className="pb-300">
                    {Noti}
                </SmallText>

                
            <Title text='주의사항 확인했어요' />
            <Btn onClick={ShowRecoil}>OK</Btn>

            <Btn onClick={HandlerRecruit}>등록하기</Btn>

        </Wrapper>
    <Footer/>
        
      
    </>
  );
};

export default Recruit;

const Wrapper = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 50px;
`;

const Btn = styled.button`
    margin: 
    width:
`;

const StyledInput = styled.input`
  padding: 0.8rem 0rem;
  margin-bottom: 0.5rem;
  border: none;
  border-bottom:  1px solid #999999;
  width: 100%;

  ::placeholder {
    color: #ccc;
    padding: 3px;
  }
  
`;

const Container = styled.div`
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
    font-family: var(--font-secondary);
    font-weight: 200;
    @media screen and (max-width: 768px) {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    }

`;

const Container2 = styled.div`
width: 70%;
margin: auto;
`;

const SmallText = styled.div`
    font-size: 10px;
    color: #ccc;
    white-space: pre-line;
    margin-bottom: 100px;
`;

const ListContainer = styled.div`
background-color: #fff;
overflow: scroll;
height: 300px;

`;

const Li = styled.li`
  list-style: none;
  font-weight: 100;
  border-bottom :  1px solid #eee;
  width: 100%;
  text-align: center;
  line-height: 50px;
 
`;



const Ul = styled.ul`
  list-style: none;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #666666;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0rem;
  border:  1px solid #eee;
  border-radius: 5px;
  width: 100%;
  margin: 20px 0px;

`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  
  ::placeholder {
    color: #ccc;
  }
`;

const SearchIcon = styled(AiOutlineSearch)`
  margin-right: 0.5rem;
  color: #ccc;
`;

