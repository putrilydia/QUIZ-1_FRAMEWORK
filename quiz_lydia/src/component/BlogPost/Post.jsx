import React from "react";

const Post = (props) => {
    return (
        <div className="artikel">
            <div className="gambar-artikel">
                <img src="http://siakad.polinema.ac.id/assets/global/img/logo-polinema.png" alt="Gambar Tumbnail Artikel"/>
            </div>
            <div className="konten-artikel">
                <div className="judul-artikel">{props.name}</div>
                <p className="isi-artikel">{props.nim}</p>
                <p className="isi-artikel">{props.phone}</p>
                <p className="isi-artikel">Studi Program {props.studyprogram}</p>
                <p className="isi-artikel">Tahun Ajaran {props.tahun}</p>
                <p className="status" >{props.status}</p>
                <button className="btn btn-sm btn-warning" onClick={() => props.hapusArtikel(props.idArtikel)}>Hapus</button>
            </div>
        </div>
    )
}

export default Post;