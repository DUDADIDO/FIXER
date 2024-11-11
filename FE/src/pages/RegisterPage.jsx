import RegisterBox from '../components/registerpage/RegisterBox';

export default function RegisterPage() {
    return (
        <div className="flex flex-col w-full mt-[10vh]">
          <div className="mb-[10vh]">
            <h1 className="text-5xl text-center">FIXER</h1>
          </div>
          <div className="flex justify-center items-center">
            <RegisterBox />
          </div>
        </div>
      );
}