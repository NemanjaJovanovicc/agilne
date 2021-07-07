import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

export default function Header() {
    const { currentUser, logout } = useAuth();

      return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={'/'}>
              <img src="/cropped-logo-2.png" width="30" height="30" className="d-inline-block align-top" alt="Logo"/>
                &nbsp; AUTO-ŠKOLA
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {!currentUser ?
                <Link className="navbar-brand" to={'/login'}>
                    <button className="btn btn-primary">Login</button>
                </Link>
                :
                <Link className="navbar-brand" to={'/profile'}>
                    <button className="btn btn-primary">Profil</button>
                </Link>
            }
            <Link className="navbar-brand" to={'/course'}>
                    <button className="btn btn-primary">Kurs</button>
            </Link>
            <Link className="navbar-brand" to={'/course-type'}>
                    <button className="btn btn-primary">Vrsta kursa</button>
            </Link>
            <Link className="navbar-brand" to={'/student'}>
                    <button className="btn btn-primary">Kandidat</button>
            </Link>
            <Link className="navbar-brand" to={'/teacher'}>
                    <button className="btn btn-primary">Instruktor</button>
            </Link>
            
            <Link className="navbar-brand" to={'/level'}>
                    <button className="btn btn-primary">Kategorija</button>
            </Link>
          
            
          </nav>
        )
}