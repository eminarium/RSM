class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  # before_filter :require_login



  access_control do
    #allow logged_in, :except => :destroy
    #allow :owner, :of => :color, :to => [:edit, :destroy]
    #allow :admin
    allow all
    #allow logged_in, :except => :destroy
    #allow anonymous, :to => [:index, :show]
  end

  # GET /users
  # GET /users.json
  def index
    @users = User.all.order(:userLogin)
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
    @roles = Role.all
  end

  # GET /users/1/edit
  def edit
    @roles = Role.all
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        @user.has_role!(params[:role_id])                             # assign a new role
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        @user.has_role!(params[:role_id])                             # assign a new role
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:userLogin, :userFName, :userLName, :userEmail, :userPhoneHome, :userPhoneMobile1, :userPhoneMobile2, :userAddress, :userDescription, :password, :password_confirmation)
    end
end
