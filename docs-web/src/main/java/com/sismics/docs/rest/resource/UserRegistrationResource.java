package com.sismics.docs.rest.resource;

import com.sismics.docs.core.constant.Constants;
import com.sismics.docs.core.dao.*;
import com.sismics.docs.core.model.jpa.*;
import com.sismics.docs.rest.constant.BaseFunction;
import com.sismics.rest.exception.ClientException;
import com.sismics.rest.exception.ServerException;
import com.sismics.rest.util.ValidationUtil;

import java.util.Date;

import jakarta.json.Json;
import jakarta.json.JsonObjectBuilder;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

/**
 * User registration resource.
 * 
 * @author sicheng
 */
@Path("/userRegistration")
public class UserRegistrationResource extends BaseResource{
    /**
     * Create a new registration request.
     *
     * @api {put} /userRegistration Register a new user
     * @apiName PutRegister
     * @apiParam {String{3..50}} username Username
     * @apiParam {String{8..50}} password Password
     * @apiParam {String{1..100}} email E-mail
     * @apiSuccess {String} status Status OK
     * @apiError (client) ValidationError Validation error
     * @apiError (server) PrivateKeyError Error while generating a private key
     * @apiError (client) AlreadyExistingUsername Login already used
     * @apiError (server) UnknownError Unknown server error
     * @apiVersion 1.5.0
     *
     * @param username User's username
     * @param password Password
     * @param email E-Mail
     * @return Response
     */
    @PUT
    public Response register(
        @FormParam("username") String username,
        @FormParam("password") String password,
        @FormParam("email") String email) {
        
        // Validate the input data
        // username = ValidationUtil.validateLength(username, "username", 3, 50);
        // ValidationUtil.validateUsername(username, "username");
        // password = ValidationUtil.validateLength(password, "password", 8, 50);
        // email = ValidationUtil.validateLength(email, "email", 1, 100);
        // ValidationUtil.validateEmail(email, "email");

        // Create the user registration
        UserRegistration userRegistration = new UserRegistration();
        userRegistration.setUsername(username);
        userRegistration.setEmail(email);
        userRegistration.setPassword(password);
        userRegistration.setStatus(Constants.DEFAULT_REGISTRATION_STATUS);
        userRegistration.setRegistrationDate(new Date());
        userRegistration.setAdminComment(null);

        // Create the userRegistrationDao
        UserRegistrationDao userRegistrationDao = new UserRegistrationDao();
        try {
            userRegistrationDao.create(userRegistration);
        } catch (Exception e) {
            if ("AlreadyExistingUsername".equals(e.getMessage())) {
                throw new ClientException("AlreadyExistingUsername", "Login already used", e);
            } else {
                throw new ServerException("UnknownError", "Unknown server error", e);
            }
        }
        
        // Always return OK
        JsonObjectBuilder response = Json.createObjectBuilder()
                .add("status", "ok");
        return Response.ok().entity(response.build()).build();
    }
}
