import SneakerItem from "../Components/SneakerItem/SneakerItem";

let ProfilePage = (props) => {
  return (
    <section className="sneakers_list">
      <div>
        <h2 className="sneakers_list-h2">Мои покупки</h2>
      </div>
      <div className="sneakers_list-grid"></div>
    </section>
  );
};

export default ProfilePage;
