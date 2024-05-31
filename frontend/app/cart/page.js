import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Image from 'next/image'

export default function Cart() {
return(
    <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Image</th>
                    <th>InStock</th>

                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {/* {data.map(item=>(
                    <tr>
                    <td>{item.productId.name}</td>
                    <td> <button onClick={()=>increment(item.productId._id,"incre")}>+</button> {item.quantity} <button onClick={()=>increment(item.productId._id,"decre")}>-</button></td>
                    <td>
                    <Image
                        src={`http://localhost:8000${item.productId.image}`}
                        width={30}
                        height={30}
                        alt="Picture of the author"
                        />
                    </td>
                    <td>{item.productId.quantity}</td>
                    <td>{item.productId.salesprice ? (item.productId.salesprice) : (item.productId.regularpricey)}</td>
                    <td>{item.productId.salesprice ? (item.productId.salesprice*item.quantity) : (item.productId.regularprice*item.quantity)}</td>
                    </tr>
                ))} */}

            </tbody>
         </Table>


         <Table striped bordered hover>
      <thead>
        <tr>

          <th>Product Total</th>
          <th>Tax</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>100</td>
          <td>15</td>
          <td>2415</td>
        </tr>


      </tbody>
    </Table>      

    </Container>
)
}