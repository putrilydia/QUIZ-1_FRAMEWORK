import React, { Component } from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";

class BlogPost extends Component {
    state = {                    // komponen state dari React untuk statefull component
        listArtikel: [],         // variabel array yang digunakan untuk menyimpan data API
        insertArtikel: {         // variable yang digunakan untuk menampung sementara data yang akan di insert
            userId: 1,           // kolom userId, id, title, dan body sama, mengikuti kolom yang ada pada listArtikel.json
            id: 1,
            nim: "",
            name: "",
            phone: "",
            programstud: "",
            status: "",
        }
    }

    ambilDataDariServerAPI = () => {                // fungsi untuk mengambil data dari API dengan penambahan sort dan order
        fetch('http://localhost:3000/posts?_sort=id&_order=desc')  // penambahan sort dan order berdasarkan parameter
            .then(response => response.json())      // ubah response data dari URL API menjadi sebuah data json
            .then(jsonHasilAmbilDariAPI => {        // data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state
                this.setState({
                    listArtikel: jsonHasilAmbilDariAPI
                })
            })
    }

    componentDidMount() {       // komponen untuk mengecek ketika compnent telah di-mount-ing, maka panggil API
        this.ambilDataDariServerAPI()  // ambil data dari server API lokal
    }

    handleHapusArtikel = (data) => {        // fungsi yang meng-handle button action hapus data
        fetch(`http://localhost:3000/posts/${data}`, { method: 'DELETE' })  // alamat URL API yang ingin kita HAPUS datanya
            .then(res => {      // ketika proses hapus berhasil, maka ambil data dari server API lokal
                this.ambilDataDariServerAPI()
            })
    }

    handleTambahArtikel = (event) => {      // fungsi untuk meng-hadle form tambah data artikel
        let formInsertArtikel = { ...this.state.insertArtikel };      // clonning data state insertArtikel ke dalam variabel formInsertArtikel
        let timestamp = new Date().getTime();                       // digunakan untuk menyimpan waktu (sebagai ID artikel)
        formInsertArtikel['id'] = timestamp;
        formInsertArtikel[event.target.name] = event.target.value;  // menyimpan data onchange ke formInsertArtikel sesuai dengan target yg diisi
        this.setState({
            insertArtikel: formInsertArtikel
        });
    }

    handleTombolSimpan = () => {            // fungsi untuk meng-handle tombol simpan
        fetch('http://localhost:3000/posts', {
            method: 'post',                                     // method POST untuk input/insert data
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertArtikel)      // kirimkan ke body request untuk data artikel yang akan ditambahkan (insert)
        })
            .then((response) => {
                this.ambilDataDariServerAPI();                  // reload / refresh data
            });
    }

    render() {
        return (
            <div className="post-artikel">
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Student Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" name="name"
                                onChange={this.handleTambahArtikel} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">NIM</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="nimStudent" name="nimStudent" onChange={this.handleTambahArtikel} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">PHONE NUMBER</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="phone" name="phone" onChange={this.handleTambahArtikel} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label" >STUDY PROGRAM</label>
                        <div className="col-sm-10">
                            <select id="studyprogram" name="studyprogram" onChange={this.handleTambahArtikel} >
                                <option value="volvo">Informatics Engineering</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">YEAR OF CLASS</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="tahun" name="tahun" onChange={this.handleTambahArtikel} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label" >STATUS</label>
                        <div className="col-sm-10">
                            <form action={this.handleTombolSimpan} method="POST">
                                <select >
                                    <option >ACTIVE</option>
                                    <option >LEAVE</option>
                                    <option >GRADUATED</option>

                                </select>
                            </form>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Student Polinema</h2>
                {
                    this.state.listArtikel.map(artikel => {  // looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <Post key={artikel.id}
                            name={artikel.name}
                            nim={artikel.nimStudent}
                            phone={artikel.phone}
                            studyprogram={artikel.studyprogram}
                            tahun={artikel.tahun}
                            status={artikel.status}
                            idArtikel={artikel.id} hapusArtikel={this.handleHapusArtikel} />     // mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default BlogPost;