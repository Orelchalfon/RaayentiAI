import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
const CompanionsList: FC<{
  companions: Companion[];
  title: string;
  classNames?: string;
}> = ({ companions, title, classNames }) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-2/3 text-lg'>Lesson</TableHead>
            <TableHead className='text-lg'>Subject</TableHead>
            <TableHead className='text-lg text-right md:text-left '>
              Duration
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map(
            ({ id, name, topic, subject, duration, color }, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Link href={`/companions/${id}`}>
                    <div className='flex items-center gap-4'>
                      <div
                        className={`size-16 grid place-items-center rounded-lg max-md:hidden`}
                        style={{ backgroundColor: getSubjectColor(subject) }}>
                        <Image
                          src={`/icons/${subject}.svg`}
                          alt='duration'
                          width={35}
                          height={35}
                        />
                      </div>
                      <div>
                        <p className='text-lg'>{name}</p>
                        <p className='text-sm'>{topic}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className='flex items-center '>
                    <p className='subject-badge'>{subject}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{duration} mins</p>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
