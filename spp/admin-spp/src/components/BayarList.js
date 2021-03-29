import React from "react";
export default class BayarList extends React.Component{
    render(){
        return (
            <div>
                {/* list */}
                <div className="card col-sm-12 my-1">
                    <div className="card-body row">
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-dark">NISN</small>
                            <h6>{this.props.nisn}</h6>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-dark">ID Petugas</small>
                            <h6>{this.props.id_petugas}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-dark">Total Bayar</small>
                            <h6>Rp {this.props.jumlah_bayar}.000</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <button className="btn btn-sm btn-block btn-dark" data-toggle="modal"
                            data-target={`#modalDetail${this.props.id_pembayaran}`}>
                                Detail
                            </button>
                        </div>
                    </div>
                </div>

                {/* modal component */}
                <div className="modal fade" id={`modalDetail${this.props.id_pembayaran}`}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5>Detail Pembayaran SPP</h5>
                            </div>
                            <div className="modal-body">
                                <h5>NISN: {this.props.nisn}</h5>
                                <h6>ID Petugas: { this.props.id_petugas }</h6>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>NISN</th>
                                            <th>Tanggal</th>
                                            <th>Bulan</th>
                                            <th>Tahun</th>
                                            <th>ID SPP</th>
                                            <th>Jumlah Bayar</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                            <tr>
                                                <td>{this.props.nisn}</td>
                                                <td>{this.props.tgl_bayar}</td>
                                                <td>{this.props.bulan_dibayar}</td>
                                                <td>{this.props.tahun_dibayar}</td>
                                                <td>{this.props.id_spp}</td>
                                                <td>Rp {this.props.jumlah_bayar}.000</td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
