import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import protobuf from "protobufjs";
import { packetNames } from "../protobuf/packetNames.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//최상위 경로
const protoDir = path.join(__dirname, "../protobuf");

//이 폴더 내에 있는 모든 proto로 끝나는 확장자를 읽는 함수
const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === ".proto") {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

const protoMessages = {}; //원본

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root(); //protobuf에 내장된 메서드 Root는 새로운 인스턴스를 생성해준다.

    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packageName, types] of Object.entries(packetNames)) {
      // console.log(`🤪 ~ file: loadProtos.js:40 ~ loadProtos ~ packageName:`, packageName);
      protoMessages[packageName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packageName][type] = root.lookupType(typeName);
      }
    }
    // console.log(protoMessages);
    console.log(`protobuf 파일 로드됨`);
  } catch (err) {
    console.error(`Protobuf 파일 로드 중 에러발생함`, err);
  }
};

//데이터가 변조될 가능성을 최대한 줄이기위해 얕은복사로 복사한 데이터를 가져다 쓸꺼임
export const getProtoMessages = () => {
  // console.log(`🤪 ~ file: loadProtos.js:55 ~ getProtoMessages ~ protoMessages:`, protoMessages);
  return { ...protoMessages }; //원본을 복사한 객체
};
