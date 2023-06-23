
// 전역변수 및 모듈 임포트
    const multer = require("multer");
    const path = require("path");


// Upload 미들웨어 
    exports.Upload = multer({

        // 1. '어떤 폴더' 안에 '어떤 파일' 을 저장할지
        storage : multer.diskStorage({
            
            // disk storage 기능
            // 1) '파일로 사용되는 폴더' 설정
                // a) 에러처리 안 한 버전
                    destination : (req, file, done) => {
                        done(null, "image")
                            // [done 콜백함수 첫 번째 매개변수]
                                // 에러처리 부분. query 에서 못 가져오면 error 처리 할 수도 있음. 
                                // 그걸 어떻게 하는거지?                          
                    }
                // b) 에러처리 한 버전 
                // destination : (req, file, done) => {
                //     const dir = "image";
                //     fs.access(dir, fs.constants.F_OK, (err) => { // 폴더 존재 확인
                //         if (err) return done(err); // 폴더가 없을 경우 에러 반환
                //         done(null, dir);
                //     });
                // }            
            , 
            // 2) '저장될 file의 이름' 정하기 
            filename : (req, file, done) => {
                
                // 원본 파일에서 '확장자' 추출 
                const ext = path.extname(file.originalname)
                
                // 파일 이름이 겹치지 않게, 현재 시간 추가 
                const filename = path.basename(file.originalname , ext) + "_" + Date.now() + ext;

                // 완료하고 내보내기 
                done(null, filename)
            }
        }), 

        // 2. 파일 사이즈 설정 (최대 파일 사이즈 설정)
        limits : {fileSize : 10 * 1024 * 1024}    
            // 10mb 임
            // ✅ gif 이기 때문에, 추가해야 할 수도?! 
    });