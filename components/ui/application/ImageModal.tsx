
"use client";

import { Button, Modal } from "flowbite-react";
import { ReactNode, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Image from 'next/image';

export function ImageModal({ img_url, children }: { img_url: string, children: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div onClick={() => setOpenModal(true)}>{children}</div>
      <Modal show={openModal} size="5xl" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="relative w-full h-auto overflow-auto">
            <Image
              src={img_url || "/default-image.jpg"}
              width={800}
              height={600}
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              alt="Certificate image"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
