'use client'

import Image from 'next/image';
import {
	useState
} from 'react'

import {
	Row,
	Col,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu
} from 'reactstrap'

function CheckoutItem({ image, name, price }) {
	const [quantity, setQuantity] = useState(1);
	const [dropdownOpen, setDropdownOpen] = useState(false)

	const toggleDropdown = () => setDropdownOpen((prevState) => !prevState)
	const selectQuantity = (e) => setQuantity(parseInt(e.currentTarget.textContent))

	return (
		<div className="d-flex gap-3 mb-3">
			<div style={{ height: 60, width: 60 }} className="d-flex align-items-center flex-shrink-0">
				<Image src={image} alt="" className="w-100" />
			</div>
			<div className="flex-grow-1">
				<p className='m-0'>{name}</p>
				<div className="m-0 text-muted d-flex align-items-center">
					<div>Qty</div>
					<Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
					<DropdownToggle caret size='sm'color='transparent' className='p-0 px-2'>{quantity}</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={selectQuantity}>1</DropdownItem>
						<DropdownItem onClick={selectQuantity}>2</DropdownItem>
						<DropdownItem onClick={selectQuantity}>3</DropdownItem>
						<DropdownItem onClick={selectQuantity}>4</DropdownItem>
						<DropdownItem onClick={selectQuantity}>5</DropdownItem>
						<DropdownItem onClick={selectQuantity}>6</DropdownItem>
						<DropdownItem onClick={selectQuantity}>7</DropdownItem>
						<DropdownItem onClick={selectQuantity}>8</DropdownItem>
						<DropdownItem onClick={selectQuantity}>9</DropdownItem>
						<DropdownItem onClick={selectQuantity}>10</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				</div>
			</div>
			<div className="text-end flex-shrink-0" style={{width: 80}}>
				<p className="m-0">${price * quantity}.00</p>
				{quantity > 1 && <p className="m-0 text-muted">${price}.00 each</p>}
			</div>
		</div>
	)
}

function CheckoutDetail({ children, price }) {
	return (
		<Row>
			<Col md={10} sm={10} className="d-flex gap-3">
				<div style={{ width: 60 }} className="flex-shrink-0"></div>
				<div className="text-truncate flex-shrink-1">
					{children}
				</div>
			</Col>
			<Col md={2} sm={2} className="text-end">
				${price}
			</Col>
		</Row>
	)
}

export { CheckoutItem, CheckoutDetail }