// 📄 src/data/lions.ts 파일 내용

// 💡 1. types에 있는 Lion 타입을 먼저 가져옵니다.
import { Lion } from '../types/lion.ts'; 

// 💡 2. 데이터 배열 이름 뒤에 ': Lion[]' 을 붙여서 타입을 확실하게 찍어줍니다!
export const initialLions: Lion[] = [
  {
    id: "1",
    name: "김멋사",
    part: "Frontend",
    tech: "React, TypeScript",
    bio: "열정 가득한 개발자",
    desc: "연락처: 010-1234-5678",
    email: "lion@test.com",
    phone: "010-1234-5678",
    img: "https://via.placeholder.com/150",
    isMe: true
  },
  // ... 뒤에 있는 나머지 사자 데이터들도 쭉 그대로 두시면 됩니다!
];